.card-size {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 8px;
  background-color: #F4F4F4;
  max-width: 300px;
  margin: 0 auto;
  height: 100px; /* add fixed height */
  width: 50%; /* add fixed width */
}

.photo-size {
  height: 300px;
  width: 100%;
  object-fit: fill;
  margin-top: 30px;
}

.bg-gray-200-button {
  background-color: #edf2f7;
}


.side{
  position: absolute;
  right: 150px;
  top: 400px;
}

.button {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 200px;
  height: 100px;
  margin-right: 0px;
  margin-bottom: 20px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  text-align: center;
}

.button:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #edf2f7;
}

.user-button {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 250px;
  height: 100px;
  margin-right: 20px;
  margin-bottom: 20px;
  background-color: white;
  border: 1px solid black;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.user-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-case{
  width: 1038px;
  height: 652px;
}
