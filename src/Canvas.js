import React, { useEffect, useState } from "react";
import config from "./config";

const Canvas = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // fetch(`https://canvas.tamu.edu/api/v1/courses?access_token=${config.CANVAS_API_TOKEN}}`)
    fetch(`https://bpmd8u3wz8.execute-api.us-east-2.amazonaws.com/`)
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => console.log(error));
  }, []);
  
  return (
    <div>
      {courses.map(course => (
        <li key={course.id}>{course.name}</li>
      ))}
    </div>
  );
};

export default Canvas;
