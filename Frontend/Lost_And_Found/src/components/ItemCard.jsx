const ItemCard=({items})=>{
    return(
<div className="grid md:grid-cols-3 gap-6 my-2">
  {items
    .filter((item) => item.status === "APPROVED")
    .map((item) => (
      <div
        key={item.id}
        className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
      >
        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
        <p className="text-gray-600 mb-2">{item.description}</p>

        <p className="text-sm">
          <span className="font-medium">Location:</span> {item.location}
        </p>

        <p className="text-sm">
          <span className="font-medium">Date:</span> {item.date}
        </p>

        <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded mt-2">
          {item.status}
        </span>

        <button className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md">
          Claim Item
        </button>
      </div>
    ))}
</div>

)
}

export default ItemCard