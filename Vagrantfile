Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/focal64"
  config.vm.box_check_update = true
  # config.vm.network "forwarded_port", guest: 80, host: 8080
  # config.vm.synced_folder "./", "/app"

  config.vm.provider "virtualbox" do |vb|
    vb.gui = false
    vb.memory = "1024"
  end

  config.vm.provision "shell", inline: <<-SHELL
  SHELL
end
