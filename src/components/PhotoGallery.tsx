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

  // Реальные свадебные фото Павла и Анастасии из Яндекс.Диска
  const photos: Photo[] = [
    {
      id: 1,
      src: "https://downloader.disk.yandex.ru/preview?url=ya-disk-public%3A%2F%2Fe_xL4bv-vYTsPQ%3A%2F1.jpg&name=1.jpg&nosw=1",
      alt: "Свадебная церемония Павла и Анастасии",
      title: "Церемония",
    },
    {
      id: 2,
      src: "https://downloader.disk.yandex.ru/preview?url=ya-disk-public%3A%2F%2Fe_xL4bv-vYTsPQ%3A%2F2.jpg&name=2.jpg&nosw=1",
      alt: "Букет невесты Анастасии",
      title: "Букет невесты",
    },
    {
      id: 3,
      src: "https://downloader.disk.yandex.ru/preview?url=ya-disk-public%3A%2F%2Fe_xL4bv-vYTsPQ%3A%2F3.jpg&name=3.jpg&nosw=1",
      alt: "Свадебные кольца Павла и Анастасии",
      title: "Обручальные кольца",
    },
    {
      id: 4,
      src: "https://downloader.disk.yandex.ru/preview?url=ya-disk-public%3A%2F%2Fe_xL4bv-vYTsPQ%3A%2F4.jpg&name=4.jpg&nosw=1",
      alt: "Первый танец молодоженов",
      title: "Первый танец",
    },
    {
      id: 5,
      src: "https://downloader.disk.yandex.ru/preview?url=ya-disk-public%3A%2F%2Fe_xL4bv-vYTsPQ%3A%2F5.jpg&name=5.jpg&nosw=1",
      alt: "Свадебный торт",
      title: "Торт",
    },
    {
      id: 6,
      src: "https://downloader.disk.yandex.ru/preview?url=ya-disk-public%3A%2F%2Fe_xL4bv-vYTsPQ%3A%2F6.jpg&name=6.jpg&nosw=1",
      alt: "Поцелуй молодоженов Павла и Анастасии",
      title: "Поцелуй",
    },
    {
      id: 7,
      src: "https://downloader.disk.yandex.ru/preview?url=ya-disk-public%3A%2F%2Fe_xL4bv-vYTsPQ%3A%2F7.jpg&name=7.jpg&nosw=1",
      alt: "Свадебная прогулка",
      title: "Прогулка",
    },
    {
      id: 8,
      src: "https://downloader.disk.yandex.ru/preview?url=ya-disk-public%3A%2F%2Fe_xL4bv-vYTsPQ%3A%2F8.jpg&name=8.jpg&nosw=1",
      alt: "Гости на свадьбе",
      title: "С гостями",
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
