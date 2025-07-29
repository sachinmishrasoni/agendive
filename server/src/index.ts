import 'dotenv/config';
import app from "./app";
// import connectDB from './shared/config/database';
import environment from './shared/config/environment';
import connectDB from './shared/config/database';

const PORT = environment.PORT;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log(`API Docs: http://localhost:${PORT}/api-docs\n`);
    });
})
