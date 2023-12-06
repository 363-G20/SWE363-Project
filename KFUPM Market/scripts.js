const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve HTML and static files
app.use(express.static('public'));

app.post('/submitForm', async (req, res) => {
    try {
        // Get the form data from the request
        const message = req.body.message;

        // Save the uploaded photo
        const photoData = req.body.photo.replace(/^data:image\/\w+;base64,/, '');
        const photoBuffer = Buffer.from(photoData, 'base64');
        fs.writeFileSync('uploaded_photo.png', photoBuffer);

        // Configure Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'outlook',
            auth: {
                user: 'ashwaliab@outlook.com',
                pass: '@Aa3480220'
            }
        });
            
        // Email configuration
        const mailOptions = {
            from: 'rxmq15@hotmail.com',
            to: 'ashwaliab@outlook.com',
            subject: 'New Form Submission',
            text: `Message: ${message}`,
            attachments: [{
                filename: 'uploaded_photo.png',
                path: 'uploaded_photo.png',
                encoding: 'base64'
            }]
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        // Respond to the client
        res.send('Form submitted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
