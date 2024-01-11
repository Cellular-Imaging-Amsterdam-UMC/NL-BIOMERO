try:
    from omero_version import omero_version
    from omero_version import build_year as omero_buildyear
except ImportError:
    # Especially common during setup.py
    omero_version = "unknown"
    omero_buildyear = "unknown"

omeroweb_version = "0.1.2_editfrontend"
omeroweb_buildyear = "2023"
