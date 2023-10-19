const ProductBadge = ({text, value}: {text: string; value: string}) => {
    return (
      <div className="bg-sky-100 rounded-full p-2 px-4 gap-2 flex items-center justify-center">
        <p className="text-sm">{text}</p>
        <p className="font-semibold text-sm">{value}</p>
      </div>
    );
  };
  
  export default ProductBadge;