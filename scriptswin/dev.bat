
set str=%cd:\=/%
java -jar activator/kgrid-activator-0.6.6.jar --kgrid.shelf.cdostore.url=filesystem:file:///%str%
