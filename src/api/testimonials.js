
const mockData = [
    {
        id: 1,
        author: "Larry Pageim",
        comment: "Amazing collection of recipes! The step-by-step instructions make cooking so much easier. I've tried several dishes and they all turned out perfect. Highly recommend!",
    },
    {
        id: 2,
        author: "Sarah Johnson",
        comment: "I've been using this app for a few weeks now, and I've already tried several recipes. They all turned out great, and the app's interface is really user-friendly. I'm definitely going to continue using it!",
    },
    {
        id: 3,
        author: "John Doe",
        comment: "I've been using this app for a few weeks now, and I've already tried several recipes. They all turned out great, and the app's interface is really user-friendly. I'm definitely going to continue using it!",
    },
];

export const getTestimonialsApi = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockData;
};