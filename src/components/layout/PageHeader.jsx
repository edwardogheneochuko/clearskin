const PageHeader = ({ 
  title, 
  subtitle,
  bgImage = false 
}) => {
  return (
    <div className={`pt-24 pb-12 px-4 ${
      bgImage 
        ? "bg-linear-to-r from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20"
        : "bg-skin-base dark:bg-skin-bg"
    }`}>
      <div className="max-w-6xl mx-auto">
        {/* Title Section */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-skin-text mb-3">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
