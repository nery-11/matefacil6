const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const cors = require('cors');

const app = express();

// Middleware para analizar el cuerpo de las solicitudes
app.use(express.json());
app.use(cors());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Conectar a MongoDB Atlas (sin las opciones deprecadas)
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://ncontrerast2:12345@metafacil.20wqq.mongodb.net/?retryWrites=true&w=majority&appName=metafacil')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Error en la conexión a MongoDB: ', err));

// Esquema de usuario
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});

// Modelo de usuario
const User = mongoose.model('User', userSchema);

// Ruta para registro de usuarios
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  
  // Encriptar la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(400).json({ error: 'Error al registrar el usuario' });
  }
});

// Ruta para inicio de sesión
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Buscar el usuario en la base de datos
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: 'Usuario no encontrado' });
  }

  // Comparar la contraseña
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: 'Contraseña incorrecta' });
  }

  // Generar un token JWT
  const token = jwt.sign({ userId: user._id }, 'SECRET_KEY');
  res.json({ token });
});

// Ruta para servir el archivo 'index.html'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar el servidor en el puerto proporcionado por Render o en el puerto 5000 para desarrollo local
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
