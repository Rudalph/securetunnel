import React from 'react'

const Portfolio = () => {
    return (
        <div>

            <div className="min-h-screen bg-white flex items-center justify-center p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center">

                        {/* LinkedIn */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow w-64 text-center">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                                alt="LinkedIn"
                                className="w-16 h-16 mx-auto mb-4"
                            />
                            <h2 className="text-lg font-semibold text-black mb-2">LinkedIn</h2>
                            <p className="text-gray-600 text-sm mb-4">Connect professionally on LinkedIn.</p>
                            <a href="https://linkedin.com/in/rudalphgonsalves" target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                                View
                            </a>
                        </div>

                        {/* GitHub */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow w-64 text-center">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                                alt="GitHub"
                                className="w-16 h-16 mx-auto mb-4"
                            />
                            <h2 className="text-lg font-semibold text-black mb-2">GitHub</h2>
                            <p className="text-gray-600 text-sm mb-4">Explore my projects and contributions.</p>
                            <a href="https://github.com/Rudalph" target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                                View
                            </a>
                        </div>

                        {/* Portfolio */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow w-64 text-center">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png"
                                alt="Portfolio"
                                className="w-16 h-16 mx-auto mb-4"
                            />
                            <h2 className="text-lg font-semibold text-black mb-2">Portfolio</h2>
                            <p className="text-gray-600 text-sm mb-4">See my featured work and experience.</p>
                            <a href="https://rudalph.vercel.app/" target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                                View
                            </a>
                        </div>

                        {/* LeetCode */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow w-64 text-center">
                            <img
                                src="https://assets.leetcode.com/static_assets/public/icons/favicon-192x192.png"
                                alt="LeetCode"
                                className="w-16 h-16 mx-auto mb-4"
                            />
                            <h2 className="text-lg font-semibold text-black mb-2">LeetCode</h2>
                            <p className="text-gray-600 text-sm mb-4">Check out my coding challenge solutions.</p>
                            <a href="https://leetcode.com/u/gonsalvesrudalph/" target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                                View
                            </a>
                        </div>

                        {/* Resume */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow w-64 text-center">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/942/942748.png"
                                alt="Resume"
                                className="w-16 h-16 mx-auto mb-4"
                            />
                            <h2 className="text-lg font-semibold text-black mb-2">Resume</h2>
                            <p className="text-gray-600 text-sm mb-4">Download my latest resume.</p>
                            <a href="/Rudalph_Resume.pdf" target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                                View
                            </a>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Portfolio