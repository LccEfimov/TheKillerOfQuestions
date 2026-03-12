cmake_minimum_required(VERSION 3.16)
project(native_guard LANGUAGES CXX)
set(CMAKE_CXX_STANDARD 17)
add_executable(native-guard src/main.cpp src/platform/DeviceRuntimeCapabilityController.cpp src/crypto/hash_utils.cpp src/io/safe_io.cpp src/telemetry/metrics.cpp)
