const Title = () => {
  return (
    <div className="w-1/2 mx-auto flex justify-between items-center">
      <div className="items-start flex flex-col w-2/3">
        <h2 className="text-5xl font-semibold text-center uppercase pt-10 text-white">
          Techy por el dia
        </h2>
        <p className="text-white text-xl pl-2 mt-2 font-bold">Infuy</p>
      </div>
      <div className="flex justify-center">
        <img
          className="p-5"
          height={170}
          style={{ height: "170px" }}
          alt="infuy"
          src="https://www.infuy.com/wp-content/themes/infuy/images/ninjas/ninja-attack-3.svg"
        />
      </div>
    </div>
  );
};

export default Title;
