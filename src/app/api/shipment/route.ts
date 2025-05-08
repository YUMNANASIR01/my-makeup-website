import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

// Define types for the shipment and request body
interface Shipment {
    id: string;
    name: string;
    email: string;
    address: string;
    status: string;
    createdAt: string;
}

interface ShipmentRequestBody {
    name: string;
    email: string;
    address: string;
}

const shipments: Shipment[] = [];

export async function POST(request: Request) {
    try {
        const body: ShipmentRequestBody = await request.json();

        // Validate the request body
        if (!body.name || !body.email || !body.address) {
            return NextResponse.json({ error: "Name, email, and address are required" }, { status: 400 });
        }

        // Create a new shipment
        const shipment: Shipment = {
            id: uuidv4(),
            ...body,
            status: "pending",
            createdAt: new Date().toISOString(),
        };

        // In a real app, you would save this to a database
        shipments.push(shipment);

        // Simulate processing delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return NextResponse.json({
            shipmentId: shipment.id,
            status: "pending",
            message: "Your order has been placed successfully",
        });
    } catch (error) {
        console.error("Shipment error:", error);
        return NextResponse.json({ error: "Failed to process shipment" }, { status: 500 });
    }
}

function uuidv4() {
    return randomUUID();
}




// import { NextResponse } from "next/server"
// import { randomUUID } from "crypto";
// // import { v4 as uuidv4 } from "uuid"

// // This would typically connect to a database
// const shipments: any[] = []

// export async function POST(request: Request) {
//     try {
//         const body = await request.json();

//         // Validate the request body
//         if (!body.name || !body.email || !body.address) {
//             return NextResponse.json({ error: "Name, email, and address are required" }, { status: 400 });
//         }

//         // Create a new shipment
//         const shipment = {
//             id: uuidv4(),
//             ...body,
//             status: "pending",
//             createdAt: new Date().toISOString(),
//         };

//         // In a real app, you would save this to a database
//         shipments.push(shipment);

//         // Simulate processing delay
//         await new Promise((resolve) => setTimeout(resolve, 1000));

//         return NextResponse.json({
//             shipmentId: shipment.id,
//             status: "pending",
//             message: "Your order has been placed successfully",
//         });
//     } catch (error) {
//         console.error("Shipment error:", error);
//         return NextResponse.json({ error: "Failed to process shipment" }, { status: 500 });
//     }
// }

// function uuidv4() {
//     return randomUUID();
// }

