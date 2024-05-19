const calculateBMI = (Height: number, Weight: number) => {
  return (Weight / (Height * Height)) * 10000;
};

export default calculateBMI;
