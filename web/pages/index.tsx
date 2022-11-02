interface HomePropos {
  count: number;
}

export default function Home(props : HomePropos) {
  return (
    // <h1>Hello Word</h1>
    <h1>contagem:{props.count}</h1>
  );
}

export const getServerSideProps = async () => {
  const response = await fetch("http://localhost:3333/pools/count");
  const data = await response.json();
  console.log(data);
  return {
    props: {
      count: data.count,
    },
  };
};

// export const getServerSideProps = async () => {

//   fetch("http://localhost:3333/pools/count")
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//     });
// };
