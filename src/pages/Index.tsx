import PhotoGallery from "@/components/PhotoGallery";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-cream">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-6xl font-serif text-rose-800 mb-6 animate-fade-in">
            Анна & Михаил
          </h1>
          <p className="text-2xl text-rose-600 mb-8 font-light">
            15 сентября 2024
          </p>
          <p className="text-lg text-rose-500 max-w-2xl mx-auto leading-relaxed">
            Добро пожаловать на страницу нашей свадьбы! Здесь вы найдете
            фотографии, видео и сможете скачать понравившиеся моменты
          </p>
        </div>
      </section>

      {/* Photo Gallery */}
      <PhotoGallery />

      {/* Thanks Section */}
      <section className="py-16 px-4 bg-rose-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-serif text-rose-800 mb-8">
            Благодарим вас
          </h2>
          <p className="text-lg text-rose-700 leading-relaxed mb-6">
            Спасибо всем, кто разделил с нами этот особенный день! Ваше
            присутствие сделало нашу свадьбу незабываемой.
          </p>
          <p className="text-rose-600 italic">С любовью, Анна и Михаил ❤️</p>
        </div>
      </section>
    </div>
  );
};

export default Index;
