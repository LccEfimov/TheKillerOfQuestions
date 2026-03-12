#include <filesystem>
#include <fstream>
#include <iostream>
#include <sstream>
#include <string>
#include <thread>

namespace fs = std::filesystem;

static bool isAllowed(const fs::path& base, const fs::path& target) {
  auto cbase = fs::weakly_canonical(base);
  auto ctarget = fs::weakly_canonical(target);
  return std::mismatch(cbase.begin(), cbase.end(), ctarget.begin()).first == cbase.end();
}

int main(int argc, char** argv) {
  fs::path base = argc > 1 ? argv[1] : fs::current_path();
  if (!fs::exists(base)) {
    std::cerr << "{\"error\":\"base_path_not_found\"}" << std::endl;
    return 1;
  }

  std::ostringstream out;
  out << "{";
  out << "\"platform\":\"native-cpp17\",";
  out << "\"cpu_threads\":" << std::thread::hardware_concurrency() << ",";
  out << "\"cwd\":\"" << fs::current_path().string() << "\",";
  out << "\"base\":\"" << base.string() << "\",";
  out << "\"allowed\":" << (isAllowed(base, fs::current_path()) ? "true" : "false");
  out << "}";

  std::cout << out.str() << std::endl;
  return 0;
}
