import { CheckCircle, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

function OrderSuccess() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem("decorai-last-order");

    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);

  if (!order) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Order information not found
          </h1>

          <button
            type="button"
            onClick={() => {
              window.location.href = "/ai-analyzer";
            }}
            className="mt-6 rounded-xl bg-violet-600 px-6 py-3 font-bold text-white"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-10">

          <div className="text-center">
            <CheckCircle
              size={72}
              className="mx-auto text-green-500"
            />

            <h1 className="mt-5 text-3xl font-extrabold text-gray-900">
              Order Placed Successfully!
            </h1>

            <p className="mt-2 text-gray-500">
              Thank you for shopping with DecorAI.
            </p>
          </div>

          <div className="mt-8 rounded-2xl bg-violet-50 p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500">
                  Order ID
                </p>

                <p className="mt-1 break-all font-bold text-gray-900">
                  {order._id}
                </p>
              </div>

              <ShoppingBag
                size={28}
                className="shrink-0 text-violet-600"
              />
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900">
              Order Summary
            </h2>

            <div className="mt-4 space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center gap-3 rounded-xl border border-gray-100 p-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 rounded-lg object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900">
                      {item.name}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>

                  <p className="font-bold text-gray-900">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between border-t pt-5">
              <span className="text-lg font-bold text-gray-900">
                Total
              </span>

              <span className="text-2xl font-extrabold text-violet-600">
                ₹{order.totalAmount}
              </span>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900">
              Delivery Details
            </h2>

            <div className="mt-4 rounded-2xl bg-gray-50 p-5 text-sm text-gray-600">
              <p className="font-bold text-gray-900">
                {order.deliveryAddress.fullName}
              </p>

              <p className="mt-2">
                {order.deliveryAddress.address}
              </p>

              <p>
                {order.deliveryAddress.city},{" "}
                {order.deliveryAddress.state} -{" "}
                {order.deliveryAddress.pincode}
              </p>

              <p className="mt-2">
                Phone: {order.deliveryAddress.phone}
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-gray-200 p-5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-700">
                Payment Status
              </span>

              <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-bold text-yellow-700">
                {order.paymentStatus}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="font-semibold text-gray-700">
                Order Status
              </span>

              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-blue-700">
                {order.orderStatus}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              window.location.href = "/ai-analyzer";
            }}
            className="mt-8 w-full rounded-xl bg-violet-600 px-5 py-3 font-bold text-white transition hover:bg-violet-700"
          >
            Continue Shopping
          </button>

        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;