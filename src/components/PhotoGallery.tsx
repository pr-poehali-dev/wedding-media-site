import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface Photo {
  id: number;
  src: string;
  alt: string;
  title: string;
}

const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // Placeholder wedding photos from Unsplash
  const photos: Photo[] = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
      alt: "Свадебная церемония",
      title: "Церемония",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800&h=600&fit=crop",
      alt: "Букет невесты",
      title: "Букет невесты",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=600&fit=crop",
      alt: "Свадебные кольца",
      title: "Обручальные кольца",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop",
      alt: "Первый танец",
      title: "Первый танец",
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=800&h=600&fit=crop",
      alt: "Свадебный торт",
      title: "Торт",
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop",
      alt: "Поцелуй молодоженов",
      title: "Поцелуй",
    },
  ];

  const downloadPhoto = async (photo: Photo) => {
    try {
      const response = await fetch(photo.src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `wedding-photo-${photo.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Ошибка скачивания фото:", error);
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-serif text-rose-800 text-center mb-4">
          Наши фотографии
        </h2>
        <p className="text-rose-600 text-center mb-12 max-w-2xl mx-auto">
          Самые яркие моменты нашего особенного дня
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="group relative overflow-hidden rounded-lg shadow-lg bg-white"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-3">
                  <Button
                    onClick={() => setSelectedPhoto(photo)}
                    className="bg-white text-rose-800 hover:bg-rose-50 rounded-full p-3"
                    size="sm"
                  >
                    <Icon name="Eye" size={16} />
                  </Button>
                  <Button
                    onClick={() => downloadPhoto(photo)}
                    className="bg-rose-600 text-white hover:bg-rose-700 rounded-full p-3"
                    size="sm"
                  >
                    <Icon name="Download" size={16} />
                  </Button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-serif text-rose-800 text-lg">
                  {photo.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Модальное окно для просмотра фото */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <Button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-12 right-0 bg-white text-black hover:bg-gray-100 rounded-full p-2"
            >
              <Icon name="X" size={20} />
            </Button>

            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              className="max-w-full max-h-full object-contain rounded-lg"
            />

            <div className="absolute bottom-4 right-4">
              <Button
                onClick={() => downloadPhoto(selectedPhoto)}
                className="bg-rose-600 text-white hover:bg-rose-700 flex items-center gap-2"
              >
                <Icon name="Download" size={16} />
                Скачать
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PhotoGallery;
