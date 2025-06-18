const express = require('express');
const app = express();
const port = 3000; // คุณสามารถเปลี่ยน port ได้ตามต้องการ

// Middleware สำหรับการ parse JSON body ใน request
app.use(express.json());

// ข้อมูลสินค้า (จำลอง) ในหน่วยความจำ
let products = [
    {
        id: 1,
        name: "สมาร์ทโฟน X Pro",
        description: "สมาร์ทโฟนรุ่นล่าสุด พร้อมกล้อง 108MP และแบตเตอรี่อึดทนทาน",
        imageUrl: "https://example.com/images/smartphone-x-pro.jpg"
    },
    {
        id: 2,
        name: "แล็ปท็อป Gaming Beast",
        description: "แล็ปท็อปสำหรับเล่นเกมประสิทธิภาพสูง พร้อมการ์ดจอ RTX 4080",
        imageUrl: "https://example.com/images/laptop-gaming-beast.jpg"
    },
    {
        id: 3,
        name: "หูฟังไร้สาย Ultra",
        description: "หูฟังตัดเสียงรบกวนพร้อมคุณภาพเสียงระดับสตูดิโอ",
        imageUrl: "https://example.com/images/headphone-ultra.jpg"
    },
    {
        id: 4,
        name: "สมาร์ทวอทช์ Fit Pro",
        description: "สมาร์ทวอทช์ติดตามสุขภาพครบวงจร วัดอัตราการเต้นของหัวใจและออกซิเจนในเลือด",
        imageUrl: "https://example.com/images/smartwatch-fit-pro.jpg"
    },
    {
        id: 5,
        name: "กล้อง Mirrorless Z9",
        description: "กล้องมิเรอร์เลสระดับมืออาชีพ ถ่ายภาพและวิดีโอ 8K",
        imageUrl: "https://example.com/images/camera-z9.jpg"
    },
    {
        id: 6,
        name: "ลำโพงบลูทูธ Sonic Boom",
        description: "ลำโพงพกพาเสียงดังกระหึ่ม กันน้ำได้ เหมาะสำหรับปาร์ตี้กลางแจ้ง",
        imageUrl: "https://example.com/images/speaker-sonic-boom.jpg"
    },
    {
        id: 7,
        name: "คีย์บอร์ด Mechanical RGB",
        description: "คีย์บอร์ดเกมมิ่ง Mechanical พร้อมไฟ RGB ปรับแต่งได้",
        imageUrl: "https://example.com/images/keyboard-rgb.jpg"
    },
    {
        id: 8,
        name: "เมาส์ไร้สาย Pro-Gamer",
        description: "เมาส์ไร้สายความแม่นยำสูง ออกแบบมาเพื่อ eSports โดยเฉพาะ",
        imageUrl: "https://example.com/images/mouse-pro-gamer.jpg"
    },
    {
        id: 9,
        name: "จอภาพ Ultrawide 34\"",
        description: "จอภาพโค้ง Ultrawide ขนาด 34 นิ้ว สำหรับการทำงานและความบันเทิง",
        imageUrl: "https://example.com/images/monitor-ultrawide.jpg"
    },
    {
        id: 10,
        name: "เราเตอร์ Wi-Fi 6 Turbo",
        description: "เราเตอร์ Wi-Fi 6 ความเร็วสูงพิเศษ ครอบคลุมพื้นที่กว้างขวาง",
        imageUrl: "https://example.com/images/router-wifi6-turbo.jpg"
    }
];

// --- Routes ---

// GET /products: ดึงข้อมูลสินค้าทั้งหมด
app.get('/products', (req, res) => {
    res.json(products);
});

// GET /products/:id: ดึงข้อมูลสินค้าตาม ID
app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// POST /products: เพิ่มสินค้าใหม่
app.post('/products', (req, res) => {
    const newProduct = req.body;
    // ตรวจสอบว่ามีข้อมูลที่จำเป็นครบถ้วนหรือไม่
    if (!newProduct.name || !newProduct.description || !newProduct.imageUrl) {
        return res.status(400).json({ message: 'Missing required fields: name, description, or imageUrl' });
    }
    // กำหนด ID ใหม่
    newProduct.id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// PUT /products/:id: อัปเดตข้อมูลสินค้า
app.put('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedProductData = req.body;
    let productIndex = products.findIndex(p => p.id === id);

    if (productIndex !== -1) {
        products[productIndex] = { ...products[productIndex], ...updatedProductData, id: id }; // รักษา ID เดิมไว้
        res.json(products[productIndex]);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// DELETE /products/:id: ลบสินค้า
app.delete('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = products.length;
    products = products.filter(p => p.id !== id);
    if (products.length < initialLength) {
        res.status(204).send(); // 204 No Content สำหรับการลบสำเร็จ
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// เริ่มต้น Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log('API Endpoints:');
    console.log(`- GET  http://localhost:${port}/products`);
    console.log(`- GET  http://localhost:${port}/products/:id`);
    console.log(`- POST http://localhost:${port}/products`);
    console.log(`- PUT  http://localhost:${port}/products/:id`);
    console.log(`- DELETE http://localhost:${port}/products/:id`);
});