import { useState } from "react";
import c from '../assets/courses/C.jpg';
import datascience from '../assets/courses/datascience.jpg';
import django from '../assets/courses/django.jpg';
import java from '../assets/courses/java.jpg';
import php from '../assets/courses/php.jpg';
import python from '../assets/courses/python.jpg';
import type { Course } from "../interfaces/Courses";

const initialCourses : Course[] = [
  {
    title: "Python Development",
    rating: 4.3,
    reviews: 42434,
    image: python,
    enrolled: true,
  },
  {
    title: "Java Language",
    rating: 4.2,
    reviews: 30298,
    image: java,
    enrolled: true,
  },
  {
    title: "Django",
    rating: 4.7,
    reviews: 55683,
    image: django,
    enrolled: true,
  },
  {
    title: "PHP Language",
    rating: 4.5,
    reviews: 49328,
    image: php,
    enrolled: true,
  },
  {
    title: "C/C++ Language",
    rating: 4.1,
    reviews: 31836,
    image: c,
    enrolled: false,
  },
  {
    title: "Data Science",
    rating: 4.8,
    reviews: 48329,
    image: datascience,
    enrolled: false,
  },
];

const getStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.3 && rating % 1 < 0.8;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  return (
    <>
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} className="text-yellow-400">★</span>
      ))}
      {halfStar && <span className="text-yellow-400">☆</span>}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="text-gray-300">★</span>
      ))}
    </>
  );
};

export default function CoursesSection() {
  const [courses, setCourses] = useState(initialCourses);
const [toast, setToast] = useState<string | null>(null);

  const handleEnroll = (index: number) => {
    const course = courses[index];
    if (course.enrolled) return;

    const updated = courses.map((c, i) =>
      i === index ? { ...c, enrolled: true } : c
    );

    setCourses(updated);
    setToast(`Successfully enrolled in "${course.title}"!`);

    // Clear toast after 3 seconds
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <section className="relative px-6 py-12 bg-[#f9fbff] text-black">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8">Courses</h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{course.title}</h3>
              <p className="flex items-center text-sm mt-1">
                <span className="font-bold mr-1">{course.rating.toFixed(1)}</span>
                {getStars(course.rating)}
                <span className="ml-2 text-gray-700 font-semibold">
                  ({course.reviews.toLocaleString()})
                </span>
              </p>
              <button
                onClick={() => handleEnroll(index)}
                disabled={course.enrolled}
                className={`mt-4 w-full py-2 text-sm font-semibold rounded-lg transition 
                  ${course.enrolled
                    ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                  }`}
              >
                {course.enrolled ? "Enrolled" : "Enroll"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Toast Message */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-out z-50">
          {toast}
        </div>
      )}
    </section>
  );
}
