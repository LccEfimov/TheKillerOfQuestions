#include "DeviceRuntimeCapabilityController.hpp"
#include <thread>
#include <filesystem>
std::string DeviceRuntimeCapabilityController::platformIdentification() const {
#ifdef __ANDROID__
  return "android";
#elif __linux__
  return "linux";
#else
  return "unknown";
#endif
}
unsigned int DeviceRuntimeCapabilityController::cpuThreadCount() const { return std::thread::hardware_concurrency(); }
std::string DeviceRuntimeCapabilityController::cwd() const { return std::filesystem::current_path().string(); }
bool DeviceRuntimeCapabilityController::isAllowedPath(const std::string& path, const std::string& root) const { return path.rfind(root,0)==0; }
std::string DeviceRuntimeCapabilityController::capabilityJson() const {
  return "{\"platform\":\""+platformIdentification()+"\",\"threads\":"+std::to_string(cpuThreadCount())+",\"cwd\":\""+cwd()+"\",\"storage\":\"available\",\"status\":\"available\"}";
}
