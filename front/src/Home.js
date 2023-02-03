import React, {useState, useEffect} from 'react';
import { getNews, getWeek } from './Api.js';
import { Link } from "react-router-dom";
import "./Home.css";
import ContentListe from './ContentListe';
import Navbar from './Navbar';
import one from './1.jpg';
import two from './2.jpg';
import three from './3.jpg';



function Home() {


  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNews();
        setNews(data.articles);
        console.log(data.articles);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);


  return (
    // <div className="h-screen flex gap-5 justify-center items-center">

    // <Link to="/content">Home</Link>
    // </div><div className="justify-center mt-10 page">

    <div className="justify-center mt-10 page">

      <Navbar/>

      <div className='bg-pink-100 mt-16 mx-32 contentArea'>
            <section>
              <div class=" text-white py-20">
                <div class="container mx-auto flex flex-col md:flex-row items-center my-12 md:my-24">
                  <div class="flex flex-col w-full lg:w-1/3 justify-center items-start p-8">
                    <h1 class="text-3xl md:text-5xl p-2 text-pink-600 tracking-loose">InstaLite</h1>
                    <p class="text-sm md:text-base text-black mb-4">Made with love by two Oussama's, one idriss and one ismail.</p>
                    <Link to="/content"><a href="#"
                      class="bg-transparent hover:bg-pink-600 text-pink-600 hover:text-black rounded shadow hover:shadow-lg py-2 px-4 border border-pink-600 hover:border-transparent">
                      Explore Now</a></Link>
                  </div>
                  <div class="p-8 mt-12 mb-6 md:mb-0 md:mt-0 ml-0 md:ml-12 lg:w-2/3  justify-center">
                    <div class="h-80 flex flex-wrap gap-x-10 content-center">
                      <div>
                        <img class="homepic inline-block mt-28 hidden xl:block" src={one}/></div>
                        <div>
                            <img class="homepic inline-block mt-28 hidden lg:block" src={three}/></div>
                          <div>
                          <img class="homepic inline-block mt-24 md:mt-0 p-8 md:p-0"  src={two}/></div>
                          </div>
                        </div>
                      </div>
                    </div>
            </section>
            <div className='flex justify-center mt-10'>
              <iframe seamless width="888" height="336" frameborder="0" src="https://www.infoclimat.fr/public-api/mixed/iframeSLIDE?_ll=48.85341,2.3488&_inc=WyJQYXJpcyIsIjQyIiwiMjk4ODUwNyIsIkZSIl0=&_auth=AxleSVEvU3FUeVtsB3EELVE5V2JbLQIlUy9RMg5rUi9SOV8%2BUzNTNQJsUC1VelBmVXgHZAkyUmIAa1UtCngFZANpXjJROlM0VDtbPgcoBC9Rf1c2W3sCJVM3UTEOfVIzUjFfPlMuUzACaFAxVXtQYVVnB3gJKVJrAGVVNQpiBWIDZV4yUTNTNVQ4WyYHKAQ2UWFXY1swAj1TNlEzDjVSNVIzX2pTOFM4AmtQLFViUGxVYwdgCT5SaQBjVTsKeAV5AxleSVEvU3FUeVtsB3EELVE3V2lbMA%3D%3D&_c=30faa2eff4b763f4db1c4616663b9ebc"></iframe></div>
            </div>

            <section class="bg-pink-100 mx-32 text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto max-w-7x1">
    <div class="flex flex-wrap w-full mb-4 p-4">
      <div class="w-full mb-6 lg:mb-0">
        <h1 class="sm:text-4xl text-5xl font-medium font-bold title-font mb-2 text-gray-900">News</h1>
        <div class="h-1 w-20 bg-indigo-500 rounded"></div>
      </div>
    </div>
    <div class="flex flex-wrap -m-4">
      {news.map((item) => 
      <div class="xl:w-1/3 md:w-1/2 p-4">
        <div class="bg-white p-6 rounded-lg">
          <img class="lg:h-60 xl:h-56 md:h-64 sm:h-72 xs:h-72 h-72  rounded w-full object-cover object-center mb-6" src={item.media} alt="Image Size 720x400"/>
          <h3 class="tracking-widest text-indigo-500 text-xs font-medium title-font">{item.author}</h3>
          <h2 class="text-lg text-gray-900 font-medium title-font mb-4">{item.title}</h2>
          <p class="leading-relaxed text-base">{item.summary}</p>
        </div>
      </div>
      )}
      
    </div>
  </div>
</section>
      
    </div>
    
  );
}

export default Home;
