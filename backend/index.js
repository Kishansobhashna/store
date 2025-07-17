require("dotenv").config();  
const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mysql = require('mysql');
const dotenv = require("dotenv");
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const fs = require('fs'); 
const { User } = require('./models/User');
const path = require('path');        
const JWT_SECRET = '28bcc6031c5fb7a90995007634e407e4';
const otpMap = new Map();
const http = require('http');
const { Server } = require('socket.io');

const app = express();

const port = 5000
        
app.use(cors({
    origin: "http://localhost:3000", 
    credentials: true                
}))
        
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test',
});

db.connect((err) => {
    if (err) 
    {
        console.error('Database Connection Failed:', err.stack);
        return;
    }
    console.log('Connected to database');
});

const CLIENT_ID = '953760804679-fd6qm0cldps4hdh4itud8bg2aqrr60qb.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

app.post("/google-login", async (req, res) => {
    const { credential } = req.body;

    try 
    {
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, name, picture, sub: googleId } = payload;

        db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
        if (err) return res.status(500).json({ message: "DB error" });

        if (results.length > 0) {
            const user = results[0];
            const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1d" });
            return res.json({ token, user });
        }

        const newUser = { name, email, picture, google_id: googleId };
        db.query("INSERT INTO users SET ?", newUser, (err, result) => {
            if (err) return res.status(500).json({ message: "Insert error" });

            const insertedUser = { id: result.insertId, ...newUser };
            const token = jwt.sign({ id: insertedUser.id }, JWT_SECRET, { expiresIn: "1d" });
            return res.json({ token, user: insertedUser });
        });
        });
    } 
    catch (err) 
    {   
        console.error("Google login failed:", err);
        res.status(401).json({ message: "Invalid Google token" });
    }
});

app.post('/signup', async (req, res) => {
    const { username, email, mobile, password } = req.body;
    if (!username || !email || !mobile || !password) 
    {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    try
    {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO login (username, email, mobile, password) VALUES (?, ?, ?, ?)';
        db.query(sql, [username, email, mobile, hashedPassword], (err, result) =>
        {
            if (err) 
            {
                console.error('Error inserting user:', err);
                return res.status(500).json({ success: false, message: 'Database error' });
            }
            res.status(201).json({ success: true, message: 'User registered successfully' });
        });
    } 
    catch (error) 
    {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


app.post('/login', (req, res) => {
    console.log(req.body);
    // return
    const { email, password } = req.body;
    if (!email || !password) 
    {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    const sql = 'SELECT * FROM login WHERE email = ?';
    // console.log(sql);
    // return 
    db.query(sql, [email], async (err, results) => {
        if (err) 
        {
                        console.log("hi");
            console.error('Error fetching user:', err);
            return res.status(500).json({ success: false, message: 'Database error' });
        }
        if (results.length === 0) 
        {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) 
        {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }        

        const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        res.setHeader("Content-Type", "application/json");
        res.json({ success: true, message: 'Login successful', token });
    });
});
        
        // const client = new twilio(
        //     process.env.accountSid,
        //     process.env.authToken
        // )
         
const sendOTP = (mobile, otp) => {
    return client.messages.create({
        body: `Your OTP is ${otp}`,
        to: `+91${mobile}`,   // Add country code
        from: 'YOUR_TWILIO_PHONE_NUMBER',
    });
};

app.post('/api/send-otp', async (req, res) => {
    const { mobile } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000);
    otpMap.set(mobile, otp);

    try {
        await sendOTP(mobile, otp);
        res.json({ success: true, message: 'OTP sent' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to send OTP' });
    }
});

app.post("/api/verify-otp", (req, res) => {
    const { mobile, otp } = req.body;
    const storedOtp = otpMap.get(mobile);

    if (storedOtp && storedOtp == otp) {
        otpMap.delete(mobile);
        return res.json({ success: true, message: "OTP verified" });
    }

    res.status(400).json({ success: false, message: "Invalid OTP" });
});

app.post('/submit-order', async (req, res) => {
    try 
    {
        const { name, email, address, mobile, pincode, payment, cart } = req.body;

        if (!name || !email || !address || !mobile || !pincode || !payment || !cart) 
        {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const sql = 'INSERT INTO orders (Name, Email, Address, Mobile, Pincode, Payment) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [name, email, address, mobile, pincode, payment];

        db.query(sql, values, async (err, result) => {
        if (err) 
        {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: 'Database insertion failed' });
        }

        const orderId = result.insertId;

        const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const tax = totalPrice * 0.18;
        const grandTotal = totalPrice + tax;

        const pdfPath = path.join(__dirname, `invoice_${orderId}.pdf`);
        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(pdfPath));

        doc.fontSize(20).text('Order Invoice', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Order ID: ${orderId}`);
        doc.text(`Name: ${name}`);
        doc.text(`Email: ${email}`);
        doc.text(`Phone: ${mobile}`);
        doc.text(`Address: ${address}`);
        doc.text(`Pincode: ${pincode}`);
        doc.text(`Payment Method: ${payment}`);
        doc.moveDown();

        doc.fontSize(14).text('Order Summary:');
        doc.fontSize(12).text('Product        Price     Quantity      Subtotal');
        cart.forEach(item => {
            doc.text(`${item.name}     ₹${item.price}      ${item.quantity}      ₹${item.price * item.quantity}`);
        });
        doc.moveDown();
        doc.text(`Subtotal: ₹${totalPrice.toFixed(2)}`);
        doc.text(`Tax (18%): ₹${totalPrice.toFixed(2)}`);
        doc.text(`Grand Total: ₹${totalPrice.toFixed()}`);
        doc.moveDown();
        doc.text(`Thank you for shopping with us!`);
        doc.text(`- Stylish Online Store`);
        doc.end();

        await new Promise(resolve => doc.on('end', resolve));

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                    user: 'kishanshobhashnawebyug@gmail.com',
                    pass: 'nrzq vsod kwop lmwy'
                }
        });

        const mailOptions = {
            from:'kishanshobhashnawebyug@gmail.com',
            to: email,
            subject: 'Your Order Invoice',
            text: `Thank you for your order! Invoice ${orderId} is attached.`,
            attachments: [
            {
                filename: `invoice_${orderId}.pdf`,
                path: pdfPath
            }
            ]
        };

        await transporter.sendMail(mailOptions);
        fs.unlinkSync(pdfPath); 

        res.status(200).json({
            message: 'Order placed successfully. Invoice sent via email.',
            orderId: orderId
        });
    });
    } 
    catch (error) 
    {
        console.error('Error in /submit-order:', error);
        res.status(500).json({ error: 'Server error occurred' });
    }
});

app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, price, quantity, image } = req.body;

  const sql = 'UPDATE products SET name = ?, price = ?, quantity = ?, image = ? WHERE id = ?';
  const values = [name, price, quantity, image, id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Update error:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product updated successfully' });
  });
});

// Delete Product
app.delete('/api/products/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM products WHERE id = ?', [id], (err, result) => {
    if (err)
    {
      console.error('DB delete error:', err);
      return res.status(500).json({ error: 'DB delete error' });
    }
    res.json({ message: 'Product deleted' });
  });
});

// Get paginated products
app.get('/api/products', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const offset = (page - 1) * limit;

  db.query('SELECT COUNT(*) AS total FROM products', (err, countResult) => {
    if (err) 
      return res.status(500).json({ error: 'Count error' });

    const total = countResult[0].total;
    db.query('SELECT * FROM products LIMIT ? OFFSET ?', [limit, offset], (err, result) => {
      if (err) return res.status(500).json({ error: 'Data fetch error' });

      res.json({
        data: result,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      });
    });
  });
});

//add products
app.post('/api/products', (req, res) => {
  const { name, price, quantity, image, category } = req.body;

  if (!name || !price || !quantity || !image) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sql = 'INSERT INTO products (name, price, quantity, image, category) VALUES (?, ?, ?, ?, ?)';
  const values = [name, price, quantity, image, category];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Insert error:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    res.json({ message: 'Product added successfully', productId: result.insertId });
  });
}); 


app.post('/add-to-cart', async (req, res) => {
  const { productId } = req.body;

  try {
    // 1. Check current quantity
    const [product] = await db.query('SELECT quantity FROM products WHERE id = ?', [productId]);

    if (product.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const currentQty = product[0].quantity;

    if (currentQty <= 0) {
      return res.status(400).json({ message: 'Product out of stock' });
    }

    // 2. Decrease quantity
    await db.query('UPDATE products SET quantity = quantity - 1 WHERE id = ?', [productId]);

    res.json({ message: 'Added to cart and quantity updated' });
  } catch (err) {
    console.error('Error adding to cart:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
 
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});