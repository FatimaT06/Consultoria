const express = require('express');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Conexión BD
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'consultoria'
});

conexion.connect(err => {
    if (err) {
        console.error('❌ Error BD:', err);
        return;
    }
    console.log('✅ Conectado a MySQL');
});

// Nodemailer (usa App Password)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sigmasoft29@gmail.com',
        pass: 'sebg ykju ipns yqfv'
    }
});

// Ruta formulario
app.post('/procesar_contacto', (req, res) => {
    const { nombre, email, mensaje } = req.body;

    const sql = 'INSERT INTO contacto (nombre, correo, mensaje) VALUES (?, ?, ?)';

    conexion.query(sql, [nombre, email, mensaje], (err) => {
        if (err) {
            console.error(err);
            return res.send(`
                <script>
                    alert("❌ Error al guardar la información");
                    window.location.href = "/index.html";
                </script>
            `);
        }

        const mailOptions = { from: 'fatima.torres061102@gmail.com', to: email,
            subject: 'Gracias por contactarnos', text: `Hola ${nombre},
            Gracias por comunicarte con nuestra consultoría. 
            Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto. 
            Atentamente, 
            Consultoría de Desarrollo de Software` };

        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                console.error(error);
                return res.send(`
                    <script>
                        alert("⚠️ Mensaje guardado, pero no se pudo enviar el correo");
                        window.location.href = "/index.html";
                    </script>
                `);
            }

            res.send(`
                <script>
                    alert("✅ Mensaje enviado correctamente. Revisa tu correo");
                    window.location.href = "/index.html";
                </script>
            `);
        });
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor activo en http://localhost:${PORT}`);
});