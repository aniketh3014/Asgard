import express from 'express';
import prisma from '@repo/db/client'

const app = express();

app.post("/sbihook", async(req, res) => {
    const paymentinfo: {
        token: string;
        userId: string;
        amount: string
    } = {
        token: req.body.token,
        userId: req.body.user_identity,
        amount: req.body.amount
    }

    try {
        await prisma.$transaction([
            prisma.balance.update({
                where: {
                    userId: paymentinfo.userId
                },
                data: {
                    amount: {
                        increment: Number(paymentinfo.amount)
                    }
                }
            }),
            prisma.onRampTransaction.updateMany({
                where: {
                    token: paymentinfo.token
                }, 
                data: {
                    status: "Success",
                }
            })
        ]);
        
        res.json({
            message: "Captured"
        })
    } catch(e) {
        console.log(e);
        prisma.onRampTransaction.updateMany({
            where: {
                token: paymentinfo.token
            },
            data: {
                status: "Failure"
            }
        })
        res.status(411).json({
            message: "Error while processing webhook transaction"
        })
    }
    
})

app.listen(3003);