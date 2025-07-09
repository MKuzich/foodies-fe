const TabsContent = ({ isActive, children }) => {
  return <div>{isActive ? children : null}</div>;
};

export default TabsContent;
