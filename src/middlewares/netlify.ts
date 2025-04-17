export const bufferBodyParser = (req: any, res: any, next: any) => {
    if (req.body && Buffer.isBuffer(req.body)) {
        try {
            req.body = JSON.parse(req.body.toString());
        } catch (error) {
            console.error("Failed to parse buffer body:", error);
            return res.status(400).send({ error: "Invalid JSON body" });
        }
    }
    next();
};