#include <iostream>
#include "platform/DeviceRuntimeCapabilityController.hpp"
#include "crypto/hash_utils.hpp"
#include "io/safe_io.hpp"
#include "telemetry/metrics.hpp"
int main(int argc,char** argv){
  DeviceRuntimeCapabilityController c; Timer t;
  std::string mode = argc>1?argv[1]:"--json";
  if(mode=="--self-check"){
    std::string root = c.cwd();
    bool ok = writeSafe(root, root+"/artifacts/native-self-check.txt", pseudoHash("native"));
    std::cout << "self_check=" << (ok?"ok":"failed") << " elapsed_ms=" << t.elapsedMs() << "\n";
    return ok?0:2;
  }
  std::cout << c.capabilityJson() << std::endl;
  return 0;
}
