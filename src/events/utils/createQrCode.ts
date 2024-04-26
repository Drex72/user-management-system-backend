import { logger } from "@/core"
import QRCode from "qrcode"

export const createQRCode = async (text: string) => {
    try {
        const dataUri = await QRCode.toDataURL(text, {
            errorCorrectionLevel: "H",
        })

        return dataUri
    } catch (error) {
        logger.error("Failed to generate QR code:", error)
        throw error
    }
}


