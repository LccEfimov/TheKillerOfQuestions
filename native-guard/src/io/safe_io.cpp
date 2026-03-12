#include "safe_io.hpp"
#include <fstream>
#include <filesystem>
bool writeSafe(const std::string& root,const std::string& path,const std::string& content){ if(path.rfind(root,0)!=0) return false; std::filesystem::create_directories(std::filesystem::path(path).parent_path()); std::ofstream f(path); f<<content; return true; }
