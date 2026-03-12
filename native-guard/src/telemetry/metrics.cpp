#include "metrics.hpp"
long Timer::elapsedMs() const { return std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::high_resolution_clock::now()-start).count(); }
