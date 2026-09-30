import { ArrowLeft, MapPin, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import API_BASE_URL from "../services/api";

function Checkout() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = localStorage.getItem("decorai-cart");

        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const phoneRegex = /^[6-9]\d{9}$/;
        const pincodeRegex = /^\d{6}$/;

        if (!phoneRegex.test(formData.phone)) {
            alert("Please enter a valid 10-digit Indian phone number.");
            return;
        }

        if (!pincodeRegex.test(formData.pincode)) {
            alert("Please enter a valid 6-digit pincode.");
            return;
        }

        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login before placing an order.");
            window.location.href = "/login";
            return;
        }

        const totalAmount = cart.reduce(
            (total, item) =>
                total + item.price * item.quantity,
            0
        );

        const orderData = {
            items: cart.map((item) => ({
                productId: String(item.id),
                name: item.name,
                image: item.image,
                price: item.price,
                quantity: item.quantity,
            })),

            totalAmount,

            deliveryAddress: {
                fullName: formData.fullName,
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                pincode: formData.pincode,
            },
        };

        try {
            const paymentResponse = await fetch(
                `${API_BASE_URL}/api/payments/create-order`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        amount: totalAmount,
                    }),
                }
            );

            const paymentData = await paymentResponse.json();

            if (!paymentResponse.ok) {
                throw new Error(
                    paymentData.message || "Failed to create payment."
                );
            }

            const razorpayOrder = paymentData.order;

            const options = {
                key: "rzp_test_TgkcFlSCmayVcp",

                amount: razorpayOrder.amount,

                currency: razorpayOrder.currency,

                name: "DecorAI",

                description: "Decoration Products Order",

                order_id: razorpayOrder.id,

                handler: async function (paymentResponse) {
                    console.log("Payment response:", paymentResponse);

                    try {
                        const verifyResponse = await fetch(
                            `${API_BASE_URL}/api/payments/verify`,
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type": "application/json",
                                },

                                body: JSON.stringify({
                                    razorpay_order_id:
                                        paymentResponse.razorpay_order_id,

                                    razorpay_payment_id:
                                        paymentResponse.razorpay_payment_id,

                                    razorpay_signature:
                                        paymentResponse.razorpay_signature,
                                }),
                            }
                        );

                        const verifyData = await verifyResponse.json();

                        if (!verifyResponse.ok) {
                            throw new Error(
                                verifyData.message ||
                                "Payment verification failed."
                            );
                        }

                        console.log(
                            "Payment verified:",
                            verifyData
                        );

                        const response = await fetch(
                            `${API_BASE_URL}/api/orders`,
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${token}`,
                                },

                                body: JSON.stringify({
                                    ...orderData,
                                    razorpayOrderId:
                                        paymentResponse.razorpay_order_id,
                                    razorpayPaymentId:
                                        paymentResponse.razorpay_payment_id,
                                }),
                            }
                        );

                        const data = await response.json();

                        if (!response.ok) {
                            throw new Error(
                                data.message ||
                                "Failed to create order."
                            );
                        }

                        localStorage.setItem(
                            "decorai-last-order",
                            JSON.stringify(data.order)
                        );

                        localStorage.removeItem("decorai-cart");

                        window.location.href = "/order-success";
                    } catch (error) {
                        console.error(
                            "Payment/order error:",
                            error
                        );

                        alert(
                            error.message ||
                            "Something went wrong while processing your payment."
                        );
                    }
                },

                modal: {
                    ondismiss: function () {
                        alert("Payment was cancelled.");
                    },
                },

                prefill: {
                    name: formData.fullName,
                    contact: formData.phone,
                },

                theme: {
                    color: "#7c3aed",
                },
            };

            const razorpay = new window.Razorpay(options);

            razorpay.open();

        } catch (error) {
            console.error("Order error:", error);

            alert(
                error.message ||
                "Something went wrong while creating your order."
            );
        }
    };

    return (
        <main className="min-h-screen bg-[#f8f7ff]">

            {/* Header */}
            <div className="border-b border-gray-100 bg-white">
                <div className="mx-auto flex max-w-7xl items-center px-5 py-5 lg:px-8">

                    <a
                        href="/"
                        className="flex items-center gap-2"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-sm font-bold text-white">
                            D
                        </div>

                        <span className="text-xl font-bold tracking-tight text-gray-900">
                            Decor<span className="text-violet-600">AI</span>
                        </span>
                    </a>

                </div>
            </div>

            {/* Main */}
            <div className="mx-auto max-w-5xl px-5 py-10 lg:px-8">

                {/* Back */}
                <a
                    href="/ai-analyzer"
                    className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-violet-600"
                >
                    <ArrowLeft size={16} />
                    Back to Cart
                </a>

                {/* Heading */}
                <div className="mb-8">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                            <ShoppingBag size={24} />
                        </div>

                        <div>
                            <h1 className="text-3xl font-extrabold text-[#171536]">
                                Checkout
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                Enter your delivery details to continue.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">

                    {/* Customer Details */}
                    <form
                        onSubmit={handleSubmit}
                        className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2"
                    >

                        <h2 className="text-xl font-bold text-gray-900">
                            Delivery Details
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Where should we deliver your decoration products?
                        </p>

                        <div className="mt-6 grid gap-5 sm:grid-cols-2">

                            {/* Full Name */}
                            <div className="sm:col-span-2">
                                <label className="text-sm font-semibold text-gray-700">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your full name"
                                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="text-sm font-semibold text-gray-700">
                                    Phone Number
                                </label>

                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter phone number"
                                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                                />
                            </div>

                            {/* Pincode */}
                            <div>
                                <label className="text-sm font-semibold text-gray-700">
                                    Pincode
                                </label>

                                <input
                                    type="text"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter pincode"
                                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                                />
                            </div>

                            {/* Address */}
                            <div className="sm:col-span-2">
                                <label className="text-sm font-semibold text-gray-700">
                                    Address
                                </label>

                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    placeholder="House number, street, area"
                                    className="mt-2 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                                />
                            </div>

                            {/* City */}
                            <div>
                                <label className="text-sm font-semibold text-gray-700">
                                    City
                                </label>

                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter city"
                                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                                />
                            </div>

                            {/* State */}
                            <div>
                                <label className="text-sm font-semibold text-gray-700">
                                    State
                                </label>

                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter state"
                                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                                />
                            </div>

                        </div>

                        <button
                            type="submit"
                            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-violet-700"
                        >
                            <MapPin size={18} />
                            Continue to Payment
                        </button>

                    </form>

                    {/* Order Summary */}
                    <div className="h-fit rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

                        <h2 className="text-xl font-bold text-gray-900">
                            Order Summary
                        </h2>

                        <div className="mt-5 space-y-4">
                            {cart.length === 0 ? (
                                <div className="rounded-xl bg-gray-50 p-4">
                                    <p className="text-sm text-gray-500">
                                        Your cart is empty.
                                    </p>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-3 rounded-xl bg-gray-50 p-3"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="h-14 w-14 rounded-lg object-cover"
                                        />

                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-semibold text-gray-900">
                                                {item.name}
                                            </p>

                                            <p className="mt-1 text-xs text-gray-500">
                                                ₹{item.price} × {item.quantity}
                                            </p>
                                        </div>

                                        <p className="text-sm font-bold text-gray-900">
                                            ₹{item.price * item.quantity}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="mt-6 flex items-center justify-between border-t pt-5">
                            <span className="font-bold text-gray-900">
                                Total
                            </span>

                            <span className="text-xl font-extrabold text-violet-600">
                                ₹
                                {cart.reduce(
                                    (total, item) =>
                                        total + item.price * item.quantity,
                                    0
                                )}
                            </span>
                        </div>

                    </div>

                </div>
            </div>
        </main>
    );
}

export default Checkout;