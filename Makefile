
deploy:
# 	make a structure
	mkdir ./deployment
	mkdir ./deployment/css
	mkdir ./deployment/vendor
	mkdir ./deployment/img
# 	combine
	cp -a ./css/. ./deployment/css/
	cp -a ./vendor/. ./deployment/vendor/
	cp -a ./img/. ./deployment/img/
	cp ./index.html ./deployment/index.html
	cp ./deployment.sh ./deployment/
# 	archive
	tar -zcvf deployment.tar.gz ./deployment
#	upload
	rsync -avzhe ssh ./deployment.tar.gz maker@www.compote.xyz:/srv/www/compote.xyz/
	rsync -avzhe ssh ./deployment.sh maker@www.compote.xyz:/srv/www/compote.xyz/
#	clean
	rm -rf deployment
	rm -rf deployment.tar.gz
#	apply	
	ssh -t maker@www.compote.xyz "cd /srv/www/compote.xyz;chmod +x deployment.sh;./deployment.sh"
