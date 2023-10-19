import Link from "next/link";

const LeftContent = () => {
  return (
    <div className="col-span-2">
      <h1 className="text-2xl font-semibold font-serif">Customer's Feedback</h1>
      <Link href={"/feedback"}>
        <button className="py-2 px-4 bg-slate-900 text-secondary mt-2">Give Feedback</button>
      </Link>
    </div>
  );
};

export default LeftContent;
