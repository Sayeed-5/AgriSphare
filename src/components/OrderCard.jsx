import React from 'react'

function OrderCard() {
    const getQuantityLabel = (product, quantity) =>
    product.toLowerCase().includes('npk')
      ? `${quantity.split(' ')[0]} bags`
      : `${quantity.split(' ')[0]} kg`;
  const getPriceLabel = (product, price) =>
    product.toLowerCase().includes('npk')
      ? `Price: ₹${price}/bag`
      : `Price: ₹${price}/kg`;
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start space-x-4">
          <img
            src={order.avatar}
            alt={order.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-bold text-gray-800">{order.name}</p>
            <p className="text-sm text-gray-500">
              Wants to buy: {order.product} (My product)
            </p>
          </div>
        </div>
        <div className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full">
          {getQuantityLabel(order.product, order.quantity)}
        </div>
      </div>
      <div className="mt-4 pl-14">
        <label
          htmlFor={`reason-${order.id}`}
          className="text-sm font-medium text-gray-500"
        >
          Reason
        </label>
        <input
          type="text"
          id={`reason-${order.id}`}
          className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          placeholder="Optional: Add a reason for your action"
        />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-600 font-medium pl-14 md:pl-0">
          {getPriceLabel(order.product, order.pricePerUnit)} • Total:{' '}
          <span className="font-bold text-gray-900">
            ₹{order.total.toLocaleString('en-IN')}
          </span>
        </p>
        {order.status === 'ongoing' && (
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onUpdateStatus(order.id, 'declined')}
              className="bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors duration-300 text-sm"
            >
              Decline
            </button>
            <button
              onClick={() => onUpdateStatus(order.id, 'delivered')}
              className="bg-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors duration-300 text-sm"
            >
              Accept
            </button>
          </div>
        )}
        {order.status === 'declined' && (
          <span className="text-sm font-semibold text-red-600 bg-red-100 py-1 px-3 rounded-full">
            Declined
          </span>
        )}
        {order.status === 'delivered' && (
          <span className="text-sm font-semibold text-blue-600 bg-blue-100 py-1 px-3 rounded-full">
            Delivered
          </span>
        )}
      </div>
    </div>
  );
}

export default OrderCard
