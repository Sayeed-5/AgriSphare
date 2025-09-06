const FeatureCard = ({ icon: Icon, title, description, iconColor = "text-primary-600" }) => {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-start space-x-4">
          <div className={`p-3 rounded-lg bg-gray-50 ${iconColor}`}>
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
    )
  }
  
  export default FeatureCard
  