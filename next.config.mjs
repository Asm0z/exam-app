/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'exam.elevateegy.com',
            pathname: '/uploads/categories/**',
        }]
    }
};

export default nextConfig;
// https://exam.elevateegy.com/uploads/categories/6751d758cc3deba60dd5bc8c-item_4.png