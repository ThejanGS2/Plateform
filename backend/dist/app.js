"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const foodRoutes_1 = __importDefault(require("./routes/foodRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const cartRoutes_1 = __importDefault(require("./routes/cartRoutes"));
const favoriteRoutes_1 = __importDefault(require("./routes/favoriteRoutes"));
const notificationRoutes_1 = __importDefault(require("./routes/notificationRoutes"));
dotenv_1.default.config({ override: true });
// Connect to MongoDB
(0, db_1.default)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Request Debug Logger
app.use((req, res, next) => {
    console.log(`\n[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    if (req.body && Object.keys(req.body).length > 0) {
        const debugBody = { ...req.body };
        if (debugBody.password)
            debugBody.password = '********';
        console.log('📦 Body:', debugBody);
    }
    next();
});
app.use('/api/auth', authRoutes_1.default);
app.use('/api', foodRoutes_1.default);
app.use('/api/orders', orderRoutes_1.default);
app.use('/api/user', userRoutes_1.default);
app.use('/api/cart', cartRoutes_1.default);
app.use('/api/favorites', favoriteRoutes_1.default);
app.use('/api/notifications', notificationRoutes_1.default);
const mongoose_1 = __importDefault(require("mongoose"));
app.get('/api/health', async (req, res) => {
    const dbStatus = mongoose_1.default.connection.readyState === 1 ? 'Connected' : 'Disconnected';
    res.json({
        status: 'OK',
        message: 'Backend is running',
        mongodb: dbStatus
    });
});
app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
