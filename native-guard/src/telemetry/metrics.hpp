#pragma once
#include <chrono>
struct Timer { std::chrono::high_resolution_clock::time_point start = std::chrono::high_resolution_clock::now(); long elapsedMs() const;};
