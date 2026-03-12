#include "hash_utils.hpp"
#include <functional>
std::string pseudoHash(const std::string& input) { return std::to_string(std::hash<std::string>{}(input)); }
