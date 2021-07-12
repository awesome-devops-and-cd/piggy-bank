Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/focal64"
  config.vm.box_check_update = true
  config.vm.network "forwarded_port", guest: 3000, host: 6000

  config.vm.provider "virtualbox" do |vb|
    vb.gui = false
    vb.memory = "1024"
  end

  config.vm.provision "shell", inline: <<-SHELL
    apt update
    apt install -y nodejs npm
    cd /vagrant
    npm install
  SHELL
end
