import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

// Define the structure of each item in the transaction
interface Item {
    id: string;
    name: string;
    price: number;
}

// Define the structure of the transaction object
interface Transaction {
    id: string;
    amount: number;
    method: string;
    items: Item[]; // Updated to use the Item type
    status: string;
    createdAt: string;
}

// This would typically connect to a database
const transactions: Transaction[] = [];

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate the request body
        if (!body.amount || !body.method) {
            return NextResponse.json({ error: "Amount and payment method are required" }, { status: 400 });
        }

        // Create a new transaction
        const transaction: Transaction = {
            id: randomUUID(),  // Use randomUUID directly
            amount: body.amount,
            method: body.method,
            items: body.items || [],  // Ensure this matches the expected structure
            status: "pending",
            createdAt: new Date().toISOString(),
        };

        // In a real app, you would save this to a database
        transactions.push(transaction);

        // Process payment based on method
        let processingDelay = 0;

        switch (body.method) {
            case "Credit Card":
                processingDelay = 1000; // Simulate card processing
                break;
            case "Bank Transfer":
                processingDelay = 1500; // Simulate bank verification
                break;
            case "EasyPaisa / JazzCash":
                processingDelay = 2000; // Simulate mobile wallet processing
                break;
            default:
                processingDelay = 500; // Cash on delivery is faster to process
        }

        // Simulate payment processing
        await new Promise((resolve) => setTimeout(resolve, processingDelay));

        return NextResponse.json({
            transactionId: transaction.id,
            status: "pending",
            message: "Transaction created successfully",
        });
    } catch (error) {
        console.error("Transaction error:", error);
        return NextResponse.json({ error: "Failed to process transaction" }, { status: 500 });
    }
}


// import { NextResponse } from "next/server"
// import { randomUUID } from "crypto";


// // This would typically connect to a database
// const transactions: any[] = []

// export async function POST(request: Request) {
//     try {
//         const body = await request.json();

//         // Validate the request body
//         if (!body.amount || !body.method) {
//             return NextResponse.json({ error: "Amount and payment method are required" }, { status: 400 });
//         }

//         // Create a new transaction
//         const transaction = {
//             id: randomUUID(),  // Use randomUUID directly
//             amount: body.amount,
//             method: body.method,
//             items: body.items || [],
//             status: "pending",
//             createdAt: new Date().toISOString(),
//          };
//         // In a real app, you would save this to a database
//         transactions.push(transaction);

//         // Process payment based on method
//         // This is a simplified example - in a real app, you would integrate with payment gateways
//         let processingDelay = 0;

//         switch (body.method) {
//             case "Credit Card":
//                 processingDelay = 1000; // Simulate card processing
//                 break;
//             case "Bank Transfer":
//                 processingDelay = 1500; // Simulate bank verification
//                 break;
//             case "EasyPaisa / JazzCash":
//                 processingDelay = 2000; // Simulate mobile wallet processing
//                 break;
//             default:
//                 processingDelay = 500; // Cash on delivery is faster to process
//         }

//         // Simulate payment processing
//         await new Promise((resolve) => setTimeout(resolve, processingDelay));

//         return NextResponse.json({
//             transactionId: transaction.id,
//             status: "pending",
//             message: "Transaction created successfully",
//         });
//     } catch (error) {
//         console.error("Transaction error:", error);
//         return NextResponse.json({ error: "Failed to process transaction" }, { status: 500 });
//     }
// }

// function uuidv4() {
//     return randomUUID();
// }
// // Removed duplicate function implementation

