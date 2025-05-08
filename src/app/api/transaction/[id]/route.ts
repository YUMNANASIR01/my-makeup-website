import { NextResponse } from "next/server"

interface Transaction {
  id: string
  status: string
  updatedAt: string
  [key: string]: unknown // Allows other properties with unknown types
}

const transactions: Transaction[] = []

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params
    const id = resolvedParams.id
    const body = await request.json()

    const transactionIndex = transactions.findIndex((t) => t.id === id)

    if (transactionIndex === -1) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 })
    }

    // Update the transaction with type safety
    const updatedTransaction: Transaction = {
      ...transactions[transactionIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    }

    transactions[transactionIndex] = updatedTransaction

    return NextResponse.json({
      id,
      status: updatedTransaction.status,
      message: "Transaction updated successfully",
    })
  } catch (error) {
    console.error("Transaction update error:", error)
    return NextResponse.json({ error: "Failed to update transaction" }, { status: 500 })
  }
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params
    const id = resolvedParams.id
    const transaction = transactions.find((t) => t.id === id)

    if (!transaction) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 })
    }

    return NextResponse.json(transaction)
  } catch (error) {
    console.error("Transaction fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch transaction" }, { status: 500 })
  }
}



// import { NextResponse } from "next/server"

// // This would typically connect to a database
// // For demo purposes, we're using the same array from the POST route
// // In a real app, you would use a database
// const transactions: any[] = []

// export async function PATCH(request: Request, { params }: { params: { id: string } }) {
//   try {
//     const id = params.id
//     const body = await request.json()

//     // Find the transaction
//     const transactionIndex = transactions.findIndex((t) => t.id === id)

//     if (transactionIndex === -1) {
//       return NextResponse.json({ error: "Transaction not found" }, { status: 404 })
//     }

//     // Update the transaction
//     transactions[transactionIndex] = {
//       ...transactions[transactionIndex],
//       ...body,
//       updatedAt: new Date().toISOString(),
//     }

//     return NextResponse.json({
//       id,
//       status: transactions[transactionIndex].status,
//       message: "Transaction updated successfully",
//     })
//   } catch (error) {
//     console.error("Transaction update error:", error)
//     return NextResponse.json({ error: "Failed to update transaction" }, { status: 500 })
//   }
// }

// export async function GET(request: Request, { params }: { params: { id: string } }) {
//   try {
//     const id = params.id

//     // Find the transaction
//     const transaction = transactions.find((t) => t.id === id)

//     if (!transaction) {
//       return NextResponse.json({ error: "Transaction not found" }, { status: 404 })
//     }

//     return NextResponse.json(transaction)
//   } catch (error) {
//     console.error("Transaction fetch error:", error)
//     return NextResponse.json({ error: "Failed to fetch transaction" }, { status: 500 })
//   }
// }
