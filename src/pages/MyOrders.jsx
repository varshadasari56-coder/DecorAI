import { ArrowLeft, Package } from "lucide-react";
import { useEffect, useState } from "react";
import API_BASE_URL from "../services/api";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          window.location.href = "/login";
          return;
        }

        const response = await fetch(
          `${API_BASE_URL}/api/orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch orders."
          );
        }

        setOrders(data.orders);
      } catch (error) {
        console.error("Fetch orders error:", error);
        setError(
          error.message || "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="flex items-center gap-3 mb-8">
          <Package size={30} />
          <h1 className="text-3xl font-bold">
            My Orders
          </h1>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {!error && orders.length === 0 && (
          <div className="bg-white rounded-xl p-8 text-center shadow-sm">
            <Package
              size={48}
              className="mx-auto text-gray-400 mb-4"
            />

            <h2 className="text-xl font-semibold mb-2">
              No orders yet
            </h2>

            <p className="text-gray-500">
              Your completed orders will appear here.
            </p>
          </div>
        )}

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex flex-wrap justify-between gap-4 mb-5">
                <div>
                  <p className="text-sm text-gray-500">
                    Order ID
                  </p>

                  <p className="font-semibold break-all">
                    {order._id}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-sm text-gray-500">
                    Order Date
                  </p>

                  <p className="font-medium">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString("en-IN")}
                  </p>
                </div>
              </div>

              <div className="space-y-4 border-t border-gray-100 pt-5">
                {order.items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center gap-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover border"
                    />

                    <div className="flex-1">
                      <h3 className="font-medium">
                        {item.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold">
                      ₹
                      {(
                        item.price * item.quantity
                      ).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 mt-5 pt-5 flex flex-wrap justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500">
                    Payment
                  </p>

                  <p className="font-medium capitalize">
                    {order.paymentStatus}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Order Status
                  </p>

                  <p className="font-medium capitalize">
                    {order.orderStatus}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Total
                  </p>

                  <p className="text-xl font-bold">
                    ₹{order.totalAmount.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyOrders;