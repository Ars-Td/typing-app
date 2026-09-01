{
  description = "返信打 development environment";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs =
    { nixpkgs, ... }:
    let
      systems = [
        "x86_64-linux"
        "aarch64-linux"
      ];
      forAllSystems = nixpkgs.lib.genAttrs systems;
    in
    {
      devShells = forAllSystems (
        system:
        let
          pkgs = import nixpkgs { inherit system; };
        in
        {
          default = pkgs.mkShell {
            packages = with pkgs; [
              just
              git
              gh
              wrangler
              (buildFHSEnv {
                name = "app-fhs";
                targetPkgs = p: [
                  p.glibc
                  p.zlib
                ];
              })
            ];
            shellHook = ''
              echo "返信打: just と wrangler は Nix が提供します。Node / パッケージマネージャは vp を使ってください。"
              export PATH="$HOME/.local/share/vite-plus/bin:$PATH"
            '';
          };
        }
      );
    };
}
