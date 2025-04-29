import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import { createServer } from 'http';
import { Server as SocketIO } from 'socket.io';

// Route imports
import authRoutes from './routes/auth.routes.js';
import clientRoutes from './routes/client.routes.js';
import caseRoutes from './routes/case.routes.js';
import invoiceRoutes from './routes/invoice.routes.js';
import payrollRoutes from './routes/payroll.routes.js';
import retainerRoutes from './routes/retainer.routes.js';
import clientSelfRoutes from './routes/client-self.routes.js';
import aiRoutes from './routes/ai.routes.js';
import pdfRoutes from './routes/pdf.routes.js';

dotenv.config();
const app = express();
const server = createServer(app);
const io = new SocketIO(server, { cors: { origin: '*' } });

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/cases', caseRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/payroll', payrollRoutes);
app.use('/api/retainers', retainerRoutes);
app.use('/api/client-self', clientSelfRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/pdf', pdfRoutes);

// WebSockets (basic config)
io.on('connection', (socket) => {
  console.log('🧠 New WebSocket client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

// Server start
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Backend API running on port ${PORT}`);
});
