#pragma once
#include <string>
struct DeviceRuntimeCapabilityController {
  std::string platformIdentification() const;
  unsigned int cpuThreadCount() const;
  std::string cwd() const;
  bool isAllowedPath(const std::string& path, const std::string& root) const;
  std::string capabilityJson() const;
};
