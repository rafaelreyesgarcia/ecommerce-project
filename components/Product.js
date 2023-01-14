export default function Product({
  name,
  price,
  description,
  img
}) {
  return (
    <div className="py-4">
      <div className="w-64">
        <div className="bg-blue-100 p-5 rounded-xl">
          <img src={img} alt="" />
        </div>
        <div className="mt-2">
          <h3 className="font-bold text-lg">{name}</h3>
        </div>
        <p className="text-sm mt-2 leading-4">
          {description}
        </p>
        <div className="flex mt-1">
          <div className="text-2xl font-bold grow">{price}</div>
          <button className="bg-emerald-400 text-white py-1 px-3 rounded-xl">+</button>
        </div>
      </div>
    </div>
  )
}

/* 
<div className="py-4">
  <div className="w-64">
    <div className="bg-blue-100 p-5 rounded-xl">
      <img src="/products/phones/iphone.jpg" alt="" />
    </div>
    <div className="mt-2">
      <h3 className="font-bold text-lg">Iphone 14 Pro</h3>
    </div>
    <p className="text-sm mt-2 leading-4">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, unde!
    </p>
    <div className="flex mt-1">
      <div className="text-2xl font-bold grow">$899</div>
      <button className="bg-emerald-400 text-white py-1 px-3 rounded-xl">+</button>
    </div>
  </div>
</div>
*/